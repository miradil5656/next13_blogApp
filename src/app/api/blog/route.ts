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