import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const base64KcToken = ctx.req.cookies.kcToken
    
    if(!base64KcToken) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
    try {
      return await fn(ctx)
    } catch(err) {
      if(err){
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }
  }
}