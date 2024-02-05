import prisma from "@/lib/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// import { convertBigIntToString } from "@/utils/helper";

import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
// To handle a GET request to /api
export async function POST(req: NextRequest) {
  try {
    let ownerData = await req.json();

    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // if(!session){

    // }
    const owner_id = session?.user?.id;
    await prisma.owner_profile.create({
      data: {
        email: ownerData.email,
        phone: ownerData.phone,
        name: ownerData.name,
        completed_steps: 1,
        isOwn_multiple_pharmacy: ownerData.isOwn_multiple_pharmacy,
        number_pharmacy: ownerData.number_pharmacy,
        users: {
          connect: {
            user_id: owner_id,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Info saved successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  // Do whatever you want
  try {
    let ownerData = await req.json();

    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // if(!session){

    // }
    const owner_id = session?.user?.id;

    await prisma.owner_profile.update({
      where: {
        owner_id: owner_id,
      },
      data: ownerData,
    });

    return NextResponse.json(
      { message: "Info saved successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
