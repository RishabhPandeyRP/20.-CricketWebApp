import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>()

app.use('/api/*', cors());

app.get('/', (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  return c.text('Hello Hono!')
})

// MIDDLEWARE 
app.use("/api/cart/*" , async(c , next)=>{

  try {
    const {email , token} = await c.req.json();
    const secret = 'mySecretKey'
    const verification = await verify(token , secret);

    if(token == null || token ==""){
      return c.json({
        msg : "No token"
      },401)
    }
    if(email === verification.email){
      await next();
      // return c.json({
      //   msg : "Successfully Authorized"
      // },200)
    }

    return c.json({
      msg : "Login again , something went wrong"
    })
  } catch (error:any) {
    return c.json({
      msg : "Something went wrong",
      errorName : error.name,
      
    })
  }
})

// TEST ROUTES
app.post("/api/user/login" , async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const {email , password} = await c.req.json();

    //const {success} = loginUserData.safeParse({email, password});

    // if(!success){
    //   // c.status(411);
    //   return c.json({
    //     status : 411,
    //     result : "Invalid inputs",
    //     success : success
    //   })
    // }


    const user = await prisma.user.findUnique({
      where : {email}
    })

    if(user === null){
      return c.json({
        status : 404,
        msg : "User Not found"
      },404)
    }

    if(user.password != password){
      return c.json({
        status : 400,
        msg : "Wrong password"
      },400)
    }

    const payload = {
      email,
      password,
      exp: Math.floor(Date.now() / 1000) + 60 * 120, // Token expires in 30 minutes
    }

    const secret = 'mySecretKey'
    const token = await sign(payload, secret)

    return c.json({
      status:201,
      user,
      token
    },201)

  } catch (error:any) {
    return c.json({
      status : 401,
      msg : "Some error occured",
      error : error.message
    },400)
  }
})

app.post("/api/tokenVerify" , async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const {token} = await c.req.json();
    const secret = 'mySecretKey'
    
    try {
      const verification = await verify(token , secret)
      return c.json({
        status:201,
        verification
      })
    } catch (error) {
      return c.json({
        message : "Verification failed"
      })
    }
    
  } catch (error:any) {
    return c.json({
      name : error.name,
      error : error.message
    })
  }
})

// USER ROUTES
app.post('/api/users/register', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const { username, email, password } = await c.req.json();
  // const {success} = registerUserData.safeParse({ name, email, password, phone });

  // if(!success){
  //   // c.status(411);
  //   return c.json({
  //     status : 411,
  //     result : "Invalid inputs",
  //     success : success
  //   })
  // }


  try {
    const user = await prisma.user.create({
      data: { username, email, password },
    });

    c.status(201)
    return c.json({status:201,user});

  } catch (error: any) {

    c.status(400)
    return c.json({
      msg: "something wrong happens",
      error: error.code,
      desc:error.message
    });

  }
});

app.get("/api/users/getAll" , async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const users = await prisma.user.findMany({
      include : {
        auctions  :true,
        participatedIn :true,
        ownedTeams  :true,
        notifications :true,
        adminActions  :true,
        bids    :true,  
      }
    });

    return c.json(users , 200)
  } catch (error:any) {
    return c.json({
      msg : "Something went wrong",
      error : error.message
    } , 401)
  }
})

// api for reset link generation
app.post('/api/resetLink' , async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const {email} = await c.req.json();

    const user = await prisma.user.findUnique({
      where : {email}
    })

    if(user === null){
      return c.json({
        status : 404,
        msg : "User Not found"
      },404)
    }

    const payload = {
      email,
      exp: Math.floor(Date.now() / 1000) + 60 * 120, // Token expires in 30 minutes
    }

    const secret = user.password + user.email;
    const token = await sign(payload, secret)

    const link = `http://localhost:5173/resetpass/${email}/${token}`

    return c.json({
      status:201,
      user,
      link
    },201)


  } catch (error:any) {
    return c.json({
      status : 401,
      msg : "Some error occured",
      error : error.message
    },400)
  }
})

app.post('/api/resetPass' , async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const {password , token , email} = await c.req.json();

    const user = await prisma.user.findUnique({
      where : {email}
    })

    if(user === null){
      return c.json({
        status : 404,
        msg : "User Not found"
      },404)
    }

    const secret = user.password + user.email;
    
    try {
      const verification = await verify(token , secret);
      // logic for password updation
      const user = await prisma.user.update({
        where: { email },
        data: { password},
      });
      
      return c.json({ message: 'Password updated successfully' ,user , status:201});
    } catch (error) {
      return c.json({
        message : "Verification failed"
      })
    }


  } catch (error:any) {
    return c.json({
      status : 401,
      msg : "Some error occured",
      error : error.message
    },400)
  }
})



export default app
