'use client'

import scenes from "@/public/data/scenes.json"

export default async function ScenePage({ params }: any) {

  const { id } = await params

  const scene = scenes.find((s:any) => s.id === id)

  if (!scene) {
    return <div>Scene not found</div>
  }

  return (

    <div style={{padding:"40px"}}>

      <h1>{scene.name}</h1>

      <p>{scene.description}</p>

      <h3>人物</h3>

      <ul>
        {scene.characters.map((c:string,i:number)=>(
          <li key={i}>{c}</li>
        ))}
      </ul>

      <h3>可发生的事件</h3>

      {scene.episodes.map((ep:any,i:number)=>(
        <div key={i} style={{marginBottom:"20px"}}>

          <h4>{ep.title}</h4>

          <button
            onClick={() => {

              const prompt = `
世界：
${scene.world}

场景：
${scene.name}

人物：
${scene.characters.join("、")}

事件：
${ep.title}

开场：
${ep.opening}

请继续演绎这个场景。
`

              navigator.clipboard.writeText(prompt)

              alert("提示词已复制")

            }}
          >
            复制提示词
          </button>

        </div>
      ))}

    </div>

  )
}