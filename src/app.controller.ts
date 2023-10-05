import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/gpt')
  async askToGPT(@Query() body: {request: string}){
    console.log(body)
    const {request} = body;
    if(!request){return "no Reqeust Body "}
    const askToGPT: string = await this.appService.askToGPT(request);

    return askToGPT;
  }

  @Post('/gpt')
  async askToGPTKaKaoPost(@Body() body){
    console.log(body)
    const request = body?.action?.params?.request  || 'no reqeust body'
    const askToGPT: string = await this.appService.askToGPT(request);

    return {
      "version": "2.0",
      "template": {
          "outputs": [
              {
                  "simpleText": {
                      "text": askToGPT
                  }
              }
          ]
      }
  };
  }
}
