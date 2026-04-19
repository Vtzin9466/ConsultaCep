import Style from './hero.module.css'

export default function Hero () {
    return(
        <header className={Style.background}>
            <nav className={Style.nav}>
                <h1>Seja Bem-vindo a consulta de Cep</h1>
            </nav>
        </header>
    )
}