const clientId = "bf4cc403b85342aaaf233cfa5b9246ff";
const clientSecret = "ZDaYVn3qG4EEm0BGhwyRH1KPHhhst1MR";
const accessTokenUrl = "https://us.battle.net/oauth/token";
const petIndexUrl = "https://us.api.blizzard.com/data/wow/pet/index";
let accesstoken;

async function battlePets() {
  const response = await fetch(accessTokenUrl, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const data = await response.json();
  console.log(data); // token 
  let accesstoken = data.access_token;
  console.log(accesstoken); // token code

 // pet index url search params

 const petIndexParameters = new URLSearchParams({
    namespace: 'static-US',// wow parameters needed
    locale: "en-US",
    access_token: accesstoken,
 })

 const petIndexResponse = await fetch(`${petIndexUrl}?${petIndexParameters.toString()}`)
 const petIndexData = await petIndexResponse.json();
 console.log(petIndexData);
 for(let i = 0; i< petIndexData.pets.length; i++){ 
    const petData = petIndexData.pets[i];

    const petIDParameters = new URLSearchParams({
        namespace: 'static-US',
        locale: "en-US",
        access_token: accesstoken,
    })
    const petID = petData.id
    const petMediaResponse = await fetch(`https://us.api.blizzard.com/data/wow/pet/${petID}?${petIDParameters}`)
    const petMediaData = await petMediaResponse.json();
    const petMedia = petMediaData.icon
    const petDescriptionText = petMediaData.description.en_US;
   
   
if(petMedia.includes('blue')){
    const petImages = document.getElementById("pet-images");
    const petContainer = document.createElement("div");
    petContainer.className = "pet-container"
    const petPictureContainer = document.createElement("div");
    petPictureContainer.className = "pet-picture-container"
    const petImage = document.createElement("img");
    petImage.src = petMedia;
    petImage.className = "pet-picture-image"
    petPictureContainer.appendChild(petImage);
    let petName = document.createElement("p");
    petName.innerText = `Pet Name: ${petData.name.en_US}`;
    let petDescription = document.createElement('p');
    petDescription.classList.add('pet-description');
    petDescription.innerHTML = `Pet Description: <br> ${petDescriptionText}`
   
 
    
    petContainer.appendChild(petPictureContainer);
    petContainer.appendChild(petName);
   
    petContainer.appendChild(petDescription);
    petImages.appendChild(petContainer);
}


}



}

battlePets();
