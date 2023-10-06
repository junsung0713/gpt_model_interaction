import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';


@Injectable()
export class AppService {

  openai = new OpenAI({
    apiKey: process.env.OPENAI_SECRET_KEY,
  });
  
  async askToGPT(reqeust:string):Promise<string>{    
    const response = await this.ask(reqeust);

    return response;
    }

    async askToModel(GPTResponse:string):Promise<string> {

      return ""
    }

    async GPTModelInteraction(GPTResponse:string, modelResponse: string){
      const response = this.ask(modelResponse);

      return response;
    }

    async ask(contents: string):Promise<string>{
     try{ console.log(contents)
      const params: OpenAI.Chat.ChatCompletionCreateParams = {
        messages: [{ role: 'user', content: contents }],
        model: 'gpt-3.5-turbo'
    };
    console.log(params)
    const chatCompletion: OpenAI.Chat.ChatCompletion = await this.openai.chat.completions.create(params);
    const response = chatCompletion.choices[0].message.content

    return response
  } catch(e){
      console.log(e)
      if(e.status === 401){
        return "GPT KEY 오류"
      }
    }
    }

}
