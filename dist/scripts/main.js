
const clientId = "bf4cc403b85342aaaf233cfa5b9246ff";
const clientSecret = "ZDaYVn3qG4EEm0BGhwyRH1KPHhhst1MR";
const accessTokenUrl = "https://us.battle.net/oauth/token";
const petIndexUrl = "https://us.api.blizzard.com/data/wow/pet/index";
let accesstoken;

 
     fetch(accessTokenUrl, {
        method:"POST",
        body: new URLSearchParams({
            grant_type: 'client_credentials',
        }),
        headers: {
            Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }).then((response) => response.json())
        .then((data) => {
            let accesstoken = data.access_token;
            console.log(accesstoken);

            const petIndexParameters =  new URLSearchParams ( {
                namespace: 'static-us',
                locale: "en_US",
                access_token: accesstoken,
            });
            return fetch(`${petIndexUrl}?${petIndexParameters.toString()}`)
    
        })
        .then((response) => response.json())
        .then((petIndexData) => {    
        
          for(let i = 0; i < petIndexData.pets.length; i++){ 
            let petData = petIndexData.pets[i];
            console.log(petData);
          

          const petIDParas = new URLSearchParams({ 
            namespace: 'static-us',
            locale: 'en-US',
            access_token: accesstoken,
          })
          const petId = petData.id;
          console.log(petId);
          }
        
        }); 

 
      
        






