import {useState} from 'react';
import { AuthBindings } from '@refinedev/core/dist/interfaces';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@refinedev/react-hook-form';
import Form from 'components/common/Form';
 import { Create } from '@refinedev/mui';
 import { useActiveAuthProvider } from '@refinedev/core';
import { useGetIdentity } from '@refinedev/core';
import { SaveButtonProps } from '@refinedev/mui';



const CreatePlayers = () => {
  
  const navigate = useNavigate();
  const { data: user} = useGetIdentity<{name: string, email: string}>();
  
  const [playerImage, setPlayerImage] = useState({ name: '', url: ''});
 
  const {  refineCore: {onFinish, formLoading}, register, handleSubmit} = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setPlayerImage({ name: file?.name, url: result }),
    );
  };

const onFinishHandler =  async (data: FieldValues) => {
   if(!playerImage.name) return alert("Please select an Image");

   await onFinish({...data, photo: playerImage.url, email: user?.email});
   
};


  return (
    
      <Form
        type="create"


        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        onFinishHandler={onFinishHandler}
        playerImage={playerImage} />

      
  );
};

export default CreatePlayers