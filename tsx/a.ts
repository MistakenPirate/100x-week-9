// const x: number = 1;
// console.log(x);

function greet(x:string){
    console.log(x)
}

function sum(x:number,y:number):number{
    return x+y
}

greet("This")
console.log(sum(1,2))

function runAfter1s(fn:()=>void){
    setTimeout(fn,1000)
}

runAfter1s(function(){
    console.log("hi there")
})