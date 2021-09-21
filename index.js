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
	covr="codecov/codecov-action@v1";
  }else if(covr=="coverlet"){
	covr="Hello coverlet";
  }
	
  console.log(`HERE IS THE COMMAND - ${choosenlang}!`);
  
  core.setOutput("startupcmd", choosenlang);

  core.setOutput("coveragetest", covr);

  // const time = (new Date()).toTimeString();
 // core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
