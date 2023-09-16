import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

export async function PATCH(
	req: Request,
	{ params }: { params: { serverId: string } }
) {
	try {
		const profile = await currentProfile();

		if (!profile) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		if (!params?.serverId) {
			return new NextResponse('Server ID Missing', { status: 400 });
		}

		const { name, imageUrl } = await req.json();

		const server = await db.server.update({
			data: {
				name,
				imageUrl,
			},
			where: {
				id: params.serverId,
				profileId: profile.id,
			},
		});

		return NextResponse.json(server);
	} catch (error) {
		console.log('[SERVER_ID_PATCH]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
