import NavBar from '../components/nav-bar';


export default function Layout({children} : {children: React.ReactNode}){
    return (
        <div className=''>
            <NavBar />
            <div className=''>
                {children}
            </div>
        </div>
    );
}