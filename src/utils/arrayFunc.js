export const countDuplicateItemArray = (value,array)=>{

let count = 0;
array.forEach(arrayValue => {

    if(arrayValue == value){
        count++
    }
    
});
return count;

};






export const removeArrayDuplicates = array =>{

    return Array.from(new Set(array))
}



export const removeitemArray = (array,item)=>{



    const index = array.indexOf(item);


    if(index > -1){

        array.splice(index , 1)
    }

    return array;
}