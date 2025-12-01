import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);

    if (!post) {
        return (
            <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
                <Link href="/blog" className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to posts
                </Link>
                <div className="text-center text-zinc-400 py-12">
                    <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                    <p>The blog post you're looking for doesn't exist.</p>
                </div>
            </main>
        );
    }

    const postImageUrl = post.image
        ? urlFor(post.image)?.width(800).height(450).url()
        : null;

    return (
        <main className="container mx-auto min-h-screen max-w-4xl px-4 py-8 flex flex-col gap-6">
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors w-fit"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to posts
            </Link>

            {postImageUrl && (
                <img
                    src={postImageUrl}
                    alt={post.title}
                    className="w-full aspect-video rounded-xl object-cover border border-white/10"
                    width="800"
                    height="450"
                />
            )}

            <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </time>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {post.title}
            </h1>

            <article className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-zinc-300 prose-a:text-gold-400 prose-a:no-underline hover:prose-a:text-gold-300 prose-strong:text-white prose-code:text-gold-400 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/10">
                {Array.isArray(post.body) && <PortableText value={post.body} />}
            </article>
        </main>
    );
}
