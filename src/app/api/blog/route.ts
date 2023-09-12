import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function main(){
    try {
        await prisma.$connect();
    } catch (error) {
        return Error("error connecting to database");
    }
    
}

//GET
export const GET = async (req: Request, res: NextRequest) => {
    try {
        await main();
        const posts = await prisma.post.findMany();
        return NextResponse.json({maessage: "success", posts}, {status: 200});
    } catch (error) {
        return NextResponse.json({maessage: "Error", error}, {status: 500});
    }
    finally {
        await prisma.$disconnect();
    }
}

//post
export const POST = async (req: Request, res: NextRequest) => {
    try {
        const {title, content} = await req.json();
        await main();
        const post  = await prisma.post.create({data:{title,content}})
        return NextResponse.json({maessage: "success", post}, {status: 201});
    } catch (error) {
        return NextResponse.json({maessage: "Error", error}, {status: 500});
    }
    finally {
        await prisma.$disconnect();
    }
}
