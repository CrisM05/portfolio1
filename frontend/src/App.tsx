import "./styles/App.scss"
import Terminal from "./components/Terminal"
import Commands from "./components/Commands"
type Props = {}

export default function App({}: Props) {
  return (
    <>
      <Terminal />
      <Commands />
    </>
  )
}