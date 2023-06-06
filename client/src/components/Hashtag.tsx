import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"

interface Hashtag {
    _id: string;
    name: string;
    posts: Array<string>;
}

interface HashtagsProps {
    handleCreateHashtag: () => void
}

export default function Hashtag(props: HashtagsProps) {
    const { id } = useParams();
    const [currentId, setcurrentId] = useState('');
    const [hashtag, setHashtag] = useState({} as Hashtag);
    const [updatedHashtagName, setUpdatedHashtagName] = useState('' as string);
    const { handleCreateHashtag } = props

    const updateHashtag = () => {
        console.log('funciona')

        try {
            console.log('funciona')
            fetch(`http://localhost:5000/hashtags/${currentId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: updatedHashtagName,
                }),
              })
              .then(response => response.json())
              .then(data => console.log('data: ', data))
              handleCreateHashtag()

            } catch (error) {
          console.error("Error:", error);

        }
        console.log('não funciona')
      };

      const deleteHashtag = () => {
        fetch(`http://localhost:5000/hashtags/${currentId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: updatedHashtagName,
            }),
          })
          .then(response => response.json())
          .then(data => console.log('data: ', data))
          handleCreateHashtag()
      }
    
    useEffect(() => {
      setcurrentId(id);
      console.log(currentId)
    },[id])
  
    useEffect(() => {
        const fetchHashtag = async () => {
          try {
              const response = await fetch(`http://localhost:5000/hashtags/${currentId}`);
              const data = await response.json();
              console.log(data)
              setHashtag(data);
          } catch (err) {
              console.error(err);
           }
  
        };
        currentId && fetchHashtag();
      }, [currentId]);
    return(
        <div>
            <div>{hashtag.name} detail</div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="bg-slate-300">Update hashtag</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Update Hashtag</h4>
                            <p className="text-sm text-muted-foreground">
                            Set the new name for the hashtag.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Input
                                id="name"
                                onChange={(e) => setUpdatedHashtagName(e.target.value)}
                                value={updatedHashtagName}
                                className="col-span-2 h-8"
                                />
                            </div>
                        </div>
                    </div>
                    <Button onClick={updateHashtag} variant="outline" className="mt-2 bg-slate-300">Update hashtag</Button>
                </PopoverContent>
            </Popover>
                    <Button onClick={deleteHashtag} variant="outline" className="mt-2 bg-red-300">Delete hashtag</Button>
        </div>
    )
}