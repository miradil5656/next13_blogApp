import { NextRequest, NextResponse } from "next/server";
import { main } from "../route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//GET
export const GET = async (req: Request, res: NextRequest) => {
    try {

        const id:number = parseInt(req.url.split("/blog/")[1]);
        console.log(id);
        await main();
        const post = await prisma.post.findFirst({where:{id}});
        return NextResponse.json({maessage: "success", post}, {status: 200});
    } catch (error) {
        return NextResponse.json({maessage: "Error", error}, {status: 500});
    }
    finally {
        await prisma.$disconnect();
    }
}

//PUT
export const PUT = async (req: Request, res: NextRequest) => {
    try {
        const id:number = parseInt(req.url.split("/blog/")[1]);
        const {title, content} = await req.json();
       
        await main();
        const post = await prisma.post.update(
            {
                data:{title,content},
                where:{id},
            }
        );
        return NextResponse.json({maessage: "success", post}, {status: 200});
    } catch (error) {
        return NextResponse.json({maessage: "Error", error}, {status: 500});
    }
    finally {
        await prisma.$disconnect();
    }
}

//delete
export const DELETE = async (req: Request, res: NextRequest) => {
    try {
        const id:number = parseInt(req.url.split("/blog/")[1]);
        
       
        await main();
        const post = await prisma.post.delete({where:{id}})
        return NextResponse.json({maessage: "success", post}, {status: 200});
    } catch (error) {
        return NextResponse.json({maessage: "Error", error}, {status: 500});
    }
    finally {
        await prisma.$disconnect();
    }
}