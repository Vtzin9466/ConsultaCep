import Style from './fundo.module.css'
import LightPillar from '@/components/lightPilar/LightPillar'

export default function Fundo() {
    return (
        <>
            <header className={Style.pilar}>
                <LightPillar />
            </header>
        </>
    )
}