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
  console.log(data);
  let accesstoken = data.access_token;
  console.log(accesstoken);

 // pet index url search params

 const petIndexParameters = new URLSearchParams({
    namespace: 'static-US',
    locale: "en-US",
    access_token: accesstoken,
 })

 const petIndexResponse = await fetch(`${petIndexUrl}?${petIndexParameters.toString()}`)
 const petIndexData = await petIndexResponse.json();
 console.log(petIndexData);

}





battlePets();
