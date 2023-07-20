const clientId = "bf4cc403b85342aaaf233cfa5b9246ff";
const clientSecret = "ZDaYVn3qG4EEm0BGhwyRH1KPHhhst1MR";
const battlePetUrl = "https://us.api.blizzard.com/data/wow/pet/index";
const accessTokenUrl = "https://us.battle.net/oauth/token";

 
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
        .then((data) => console.log(data));
      
        






