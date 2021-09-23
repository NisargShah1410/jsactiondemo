const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `language` input defined in action metadata file
  const cmd = core.getInput('language');
  let choosenlang=cmd.toLocaleLowerCase().trim();
  const path = core.getInput('path');
  let filepath= path;
  if(choosenlang=="java"){
      choosenlang="maven clean install";
  }else if(choosenlang == "angular"){
      choosenlang="npm install";
  }else if( choosenlang=="python"){
      choosenlang="pip install -r requirements.txt";
  }else if( choosenlang=="dotnet"){
      choosenlang=`dotnet build ${filepath} --configuration Release`;
  }
  
  const cvrg = core.getInput('cov');
  let  covr = cvrg.toLocaleLowerCase().trim();
  if(covr=="codecov"){
	covr="npm install -g @angular/cli && ng test --code-coverage";
  }else if(covr=="coverlet"){
	covr="dotnet test /p:CollectCoverage=true /p:CoverletOutput=TestResults/ /p:CoverletOutputFormat=lcov";
  }
  
  //const fp = core.getInput('file-path');
  //let fpath = fp;
	
  //let covsett = "/p:CollectCoverage=true /p:CoverletOutput=TestResults/ /p:CoverletOutputFormat=lcov";

  console.log(`HERE IS THE COMMAND - ${choosenlang}!`);
  
  core.setOutput("startupcmd", choosenlang);

  core.setOutput("coveragetest", covr);
	
  //core.setOutput("filep", fpath);

  //core.setOutput("coverlet-settings", covsett);
  

  // const time = (new Date()).toTimeString();
 // core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
