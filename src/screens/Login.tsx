import { signInWithGoogle } from '../firebase';
import { LottieAnim } from "../components/Icons";
import { version } from "../../package.json";

export default () => {

    return <>
        <div className="bg-cyan-400 flex items-center justify-center h-screen">
            <div className="p-10 w-full max-w-md flex flex-col items-center">
                <div className="pl-5 text-2xl text-white font-bold text-center flex flex-row items-center">
                    d3vNotes <LottieAnim />
                </div>
                <div className="flex items-center justify-between">
                    <button type="button" className="bg-cyan-800 text-white font-semibold py-2 px-4 rounded shadow"
                        onClick={() => {
                            signInWithGoogle();
                        }}
                    >
                        <span className="text-2xl font-bold text-white mr-2">G</span>
                        <span className="text-lg font-medium">Sign in with Google</span>
                    </button>
                </div>
                <p className="mt-10 text-sm text-white">v{version} (<a href="https://github.com/djiordhan">github</a>)</p>
            </div>
        </div>
    </>;

}