import { useState } from 'react';
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "./ui/popover"
import { Edit, Trash2 } from 'lucide-react';


function PlaylistActionButtons(props) {
    const { id, updatePlaylistName, deletePlaylist } = props
    const [updatedPlaylistName, setUpdatedPlaylistName] = useState('' as string);

    return (
        <div>
          <Popover>
              <PopoverTrigger asChild>
                  <button variant="outline" className=""><Edit /></button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                  <div className="grid gap-4">
                      <div className="space-y-2">
                          <h4 className="font-medium leading-none">Update Playlist Name</h4>
                          <p className="text-sm text-muted-foreground">
                          Set the new name for the playlist.
                          </p>
                      </div>
                      <div className="grid gap-2">
                          <div className="grid grid-cols-3 items-center gap-4">
                              <Input
                              id="name"
                              onChange={(e) => setUpdatedPlaylistName(e.target.value)}
                              value={updatedPlaylistName}
                              className="col-span-2 h-8"
                              />
                          </div>
                      </div>
                  </div>
                    <Button onClick={() => {updatePlaylistName(id, updatedPlaylistName)}} variant="outline" className="mt-2 bg-slate-300">Update</Button>
              </PopoverContent>
          </Popover>
            <button onClick={() => {deletePlaylist(id)}}><Trash2/></button>
        </div>
    );
}

export default PlaylistActionButtons;