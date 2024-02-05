import prisma from "@/lib/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// import { convertBigIntToString } from "@/utils/helper";

import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
// To handle a GET request to /api
export async function POST(req: NextRequest) {
  try {
    let userData = await req.json();

    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // if(!session){

    // }

    const user_id = session?.user?.id;

    if (user_id) {
      await prisma.user_profile.create({
        data: {
          email: userData.email,
          phone: userData.phone,
          address: userData.city,
          dob: new Date(userData.date),
          image: userData.filePath,
          name: userData.name,
          language: userData.languages,
          completed_steps: 1,
          user_id: user_id,
        },
      });

      return NextResponse.json(
        { message: "Info saved successfully" },
        { status: 200 },
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  // Do whatever you want
  try {
    let userData = await req.json();
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // if(!session){

    // }

    const user_id = session?.user?.id;

    await prisma.user_profile.update({
      where: {
        user_id: user_id,
      },
      data: userData,
    });

    return NextResponse.json(
      { message: "Info saved successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
