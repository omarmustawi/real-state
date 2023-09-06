import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    // check if user already exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "الإيميل غير موجود!" },
        { status: 400 }
      );
    }
    // check if password is correct
    const validpassword = await bcryptjs.compare(password, user.password);
    if( !validpassword ) {
        return NextRequest.json({error: "Invalid password"} , {status: 400})
    }
    // create token data
    const tokenData = {
        id: user._id,
        name: user.name,
        email: user.email,
    }
    // create token 
    const token = await jwt.sign(tokenData , process.env.TOKEN_SECRET! , {expiresIn: "1d"} )

    const response = NextResponse.json({
        message: "Login successful" ,
        success: true,
    })
    response.cookies.set('token' , token , {httpOnly: true , path: "/" })
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
