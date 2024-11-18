import os
from pymongo import MongoClient
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from dotenv import load_dotenv
from openai import OpenAI

# Set your OpenAI API key
# Load environment variables from .env file
load_dotenv()

# Set your OpenAI API key
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
client = OpenAI()


# Initialize the GPT model
llm = ChatOpenAI(model="gpt-4")


def generate_image_from_prompt(prompt):
    response = client.images.generate(
    model="dall-e-3",
    prompt=prompt,
    size="1024x1024",
    quality="standard",
    n=1,
    )

    image_url = response.data[0].url
    return image_url


# Function to generate a command based on user prompt
def gpt_command_generate(user_prompt):
    print(user_prompt)
    prompt_template = """
    Based on the following user prompt, generate the appropriate command to complete the task:
    
    User Prompt: "{input}"
    
    Command:
    """
    
    prompt = PromptTemplate(
        input_variables=["input"],
        template=prompt_template
    )
    
    llm_chain = LLMChain(llm=llm, prompt=prompt)
    response = llm_chain.run({"input": user_prompt})
    print(response)
    return response.strip()

def gpt_generate_followup_questions(user_prompt):
    prompt_template = """
    Based on the following user prompt, generate 0 to 4 follow-up questions to gather basic necessary details to complete the task, dont go too complex. Only include questions that are absolutely necessary.
    if no information needed, simply return nothing.

    User Prompt: "{input}"
    
    the follow-up questions structured as follows:
    Question1
    Question2
    etc.
    
    add useful information like (y for yes, n for no) or (e.g., "Name") or ( '.': current directory) to help the user understand what to provide.

    Questions:
    """
    
    prompt = PromptTemplate(
        input_variables=["input"],
        template=prompt_template
    )
    
    llm_chain = LLMChain(llm=llm, prompt=prompt)
    response = llm_chain.run({"input": user_prompt})
    return response.strip().split("\n")


def explain(user_prompt):
    prompt_template = """
    Based on the following user prompt, provide a detailed explanation to help the user understand the concept or task mentioned in the prompt.

    User Prompt: "{input}"
    
    Explanation:
    """
    
    prompt = PromptTemplate(
        input_variables=["input"],
        template=prompt_template
    )
    
    llm_chain = LLMChain(llm=llm, prompt=prompt)
    response = llm_chain.run({"input": user_prompt})
    return response.strip()
