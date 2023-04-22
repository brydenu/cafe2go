import Header from 'components/header/header'
import styles from '@/styles/Home.module.css'

export default function Login() {


    return (
        <>
        <Header />
        <main className={styles.main}>
            <form>
                <div>
                    <label>Username</label>
                    <input />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" />
                </div>
            </form>
        </main>
        </>
    )
}
