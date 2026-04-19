import Style from './header.module.css'
import BuscadorCep from '../api/api'

export default function Header() {
    return (
        <main className={Style.main}>
            <div className={Style.container}>
                <BuscadorCep />
            </div>
        </main>
    )
}