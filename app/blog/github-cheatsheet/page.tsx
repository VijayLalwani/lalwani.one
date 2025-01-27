import Link from "next/link"

export default function GithubCheatsheet() {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/blog" className="text-gray-400 hover:text-gray-300 transition-colors">
          ← Back to Blog
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">Github Cheatsheet</h1>
      <time className="text-gray-400 block mb-12">Wednesday, May 29, 2024</time>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-medium mb-4">Pulling</h2>
          <p className="text-gray-400 italic mb-6">
            Let&apos;s say John and you (or more ppl) are working on the same branch.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">
                [SITUATION 1] You have some changes and John pushes. Now your local git is one commit behind.
              </h3>
              <p className="font-mono text-sm mb-2">i.e → 1</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-400">
                <li>
                  Try <code className="text-white">git pull</code> to catch up your current branch. If successful,
                  you&apos;re done!
                </li>
                <li>
                  If get <code className="text-white">Fatal: Not possible to fast-forward, aborting</code> move on to
                  SITUATION 2.
                </li>
              </ol>
            </div>

            <div>
              <h3 className="font-medium mb-2">
                [SITUATION 2] Let&apos;s say you already have multiple commits and John pushes. Now your local repo looks
                like → 1 + 3
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-400">
                <li>
                  Use <code className="text-white">git pull --rebase</code>. Think of this as putting your changes
                  aside, pulling all the pushed changes from GitHub and then popping you changes on top of that. This
                  may cause merge conflicts if John&apos;s changed files that you also changed.
                </li>
                <li>
                  If you run into <code className="text-white">Fatal: Not possible to fast-forward, aborting</code>{" "}
                  again, you may have pending changes that you haven&apos;t committed. Try{" "}
                  <code className="text-white">git stash</code> to stash your changes,{" "}
                  <code className="text-white">git pull --rebase</code> to pull John&apos;s commit,{" "}
                  <code className="text-white">git stash pop</code> to add your changes back.
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Rest of the content follows the same pattern */}
      </section>
    </article>
  )
}

