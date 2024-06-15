import jwt, { JwtPayload, Secret, SignOptions, VerifyOptions } from 'jsonwebtoken'

export const signToken = (payload: string | Buffer | object, secretOrPrivateKey: Secret, options: SignOptions) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
      if (err) {
        reject(err)
      } else {
        resolve(token as string)
      }
    })
  })
}

export const verifyToken = (token: string, secretOrPublicKey: Secret, options?: VerifyOptions) => {
  return new Promise<JwtPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, options, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded as JwtPayload)
      }
    })
  })
}

export const signTokenPair = async (
  payload: string | Buffer | object,
  secretOrPrivateKey: Secret,
  secretOrPublicKey: Secret
) => {
  const [accessToken, refreshToken] = await Promise.all([
    signToken(payload, secretOrPrivateKey, {
      algorithm: 'RS256',
      expiresIn: '1d'
    }),
    signToken(payload, secretOrPrivateKey, {
      algorithm: 'RS256',
      expiresIn: '30d'
    })
  ])

  return {
    accessToken,
    refreshToken
  }
}
