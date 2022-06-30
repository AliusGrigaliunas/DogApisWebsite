let mainBreed = document.querySelector('#mainDogList');
let subBreed = document.querySelector('#subBreedDogList');
let subBreedTitle = document.querySelector('#subDogTitle')

subBreed.style.display = 'none';
subBreedTitle.style.display = 'none';


fetch('https://dog.ceo/api/breeds/list/all').then(res=>res.json()).then(dogList=>{
    
    let dog = "affenpinscher";
    let subDog = subBreed.value;

    let ObjToArr = Object.keys(dogList.message);
        ObjToArr.map((mainSingleDog=>{
            mainBreed.innerHTML += `<option value="${mainSingleDog}">${mainSingleDog.charAt(0).toUpperCase() + mainSingleDog.slice(1)}</option>`
        }))
    
    mainBreed.addEventListener('change',(event)=>{
        event.preventDefault();
        subBreed.innerHTML = ''
        dog = mainBreed.value;
        if(dogList.message[dog].length > 0){
            subBreed.style.display = 'block';
            subBreedTitle.style.display = 'block';
            subDog = dogList.message[dog];
            subDog.map(singleSubDog=>{
                subDog = singleSubDog
                subBreed.innerHTML += `<option class="sub" value ="${singleSubDog}">${singleSubDog.charAt(0).toUpperCase() + singleSubDog.slice(1)}</option>`
            }) 
        }
        else{
            subBreed.style.display = 'none';
            subBreedTitle.style.display = 'none';
            subBreed.innerHTML = ''
            subDog = ''
        }

    })
    button.addEventListener('click',(event)=>{
        event.preventDefault()
        console.log(dog, subDog);
        if(dog && subDog){
            fetch(`https://dog.ceo/api/breed/${dog}/${subDog}/images`).then(res=>res.json()).then(images=>{
            let number = Math.floor(Math.random() * images.message.length)
            let FullBreedDog = images.message[number];
            let show = document.querySelector("#dogPicture")
            show.innerHTML = `<img src=${FullBreedDog} width="700" height="600">`
        })}else if(dog){
                fetch(`https://dog.ceo/api/breed/${dog}/images`).then(res=>res.json()).then(images=>{
                let number = Math.floor(Math.random() * images.message.length)
                let FullBreedDog = images.message[number];
                let show = document.querySelector("#dogPicture")
                show.innerHTML = `<img src=${FullBreedDog} width="700" height="600" class="border-5 border-primary">`
        })}
    })
})