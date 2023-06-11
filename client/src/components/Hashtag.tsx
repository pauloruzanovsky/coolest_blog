import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
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

export default function Hashtag(props) {
    const { id } = useParams();
    const [hashtag, setHashtag] = useState({} as Hashtag);
    const [updatedHashtagName, setUpdatedHashtagName] = useState('' as string);
    const { hashtags, updateHashtag, deleteHashtag } = props

    const fetchHashtag = () => {
      hashtags.forEach(hashtag => {
        if (hashtag._id === id) {
          setHashtag(hashtag)
        }
      })
    };

    useEffect(() => {
        fetchHashtag();
      }, [id]);

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
                      <Button onClick={() => {updateHashtag(id, updatedHashtagName)}} variant="outline" className="mt-2 bg-slate-300">Update hashtag</Button>
                </PopoverContent>
            </Popover>
              <Button onClick={() => {deleteHashtag(id)}} variant="outline" className="mt-2 bg-red-300">Delete hashtag</Button>
           
        </div>
    )
}