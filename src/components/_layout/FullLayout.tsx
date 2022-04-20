import { Outlet } from "react-router-dom";

export default function FullLayout() {
    
    // <> JSX
    return (
        <>
            {/* Header */}
            <h1>HEADER</h1>

            {/* Page Container */}
            <Outlet />
            
            {/* Footer */}
            <h5>footer</h5>
        </>
    )
}