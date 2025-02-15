import { getalluser } from "../../../lib/actions/user.actions";
import { NextResponse } from "next/server";
export const GET = async (request: any) => {
    try {
        const user = await getalluser();
        console.log("lấy được", user)
        return NextResponse.json({ data: user }, { status: 200 })
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 200 })
    }
};