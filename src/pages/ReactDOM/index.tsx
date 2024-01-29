import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Input } from "@/components/ui/input"

const Template = ({ value }: { value: string }) => {
  return <div>
    <h4 className='my-12'>renderToStaticMarkup: </h4>
    <div dangerouslySetInnerHTML={{ __html: value }}></div>
  </div>
}

const ReactDOMScreen: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('')
  const html = renderToStaticMarkup(<Template value={inputValue} />)

  return (
    <div className='mt-24 px-24 flex flex-col items-center'>
      <Input value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)} placeholder='Input string' />

      <p className='' dangerouslySetInnerHTML={{ __html: html }}></p>
    </div>
  )
}

export default ReactDOMScreen
