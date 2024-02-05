import prisma from "@/lib/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbRoles } from "@/utils/constants/roles";
import { convertBigIntToString } from "@/utils/helpers/helper";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // let userData = await req.json();

    // console.log("THis is the session ", session?.user);
    let userData = session?.user;
    let userRole = session?.user.user_metadata?.role;
    let metaData = {
      ...session?.user.user_metadata,
      email: session?.user.email,
    };

    // if(!userRole){}  -> pending

    if (userData && userRole == dbRoles.USER) {
      const userDBData = await prisma.user_profile.findFirst({
        where: {
          user_id: userData.id,
        },
      });
      return NextResponse.json(
        {
          message: "Data Fetched Successfully",
          data: convertBigIntToString(userDBData),
          userRole,
          metaData: metaData,
        },
        { status: 200 },
      );
    }

    if (userData && userRole == dbRoles.OWNER) {
      const userDBData = await prisma.owner_profile.findFirst({
        where: {
          owner_id: userData.id,
        },
      });
      return NextResponse.json(
        {
          message: "Data Fetched Successfully",
          data: convertBigIntToString(userDBData),
          userRole,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: " saved successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
