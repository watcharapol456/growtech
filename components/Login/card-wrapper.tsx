"use clinet"

import { Card, CardContent } from "../ui/card";

interface CardWrapperProps{
    children : React.ReactNode;
    headerLabel : string;
   
}

export const CardWrapper = ({
    children,
   
 

}:CardWrapperProps) =>{
    return(
        <Card className="w-[1000px] shadow-md">
            <CardContent>
            {children}
            </CardContent>
        </Card>
    )
}