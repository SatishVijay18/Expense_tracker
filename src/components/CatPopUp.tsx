import { Account } from '@/App';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';

export default function CatPopUp({
  accountList,
  setAccountList,
}: {
  accountList: Account[];
  setAccountList: React.Dispatch<React.SetStateAction<Account[]>>;
}) {
  const [popOverOpen, setPopOverOpen] = useState(false);
  return (
    <Popover open={popOverOpen} onOpenChange={setPopOverOpen}>
      <PopoverTrigger asChild>
        <Button variant="default" className="bg-custtern">
          Add Account
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="accounts-summary-wrapper h-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const obj: Account = {
                name:
                  (formData?.get('account-name') as string) ?? ('' as string),
                type:
                  (formData?.get('account-type') as string) ?? ('' as string),
              };
              const updatedAccountList = [...accountList, obj];

              setAccountList(updatedAccountList);
              setPopOverOpen(false);
            }}
          >
            <Input
              required
              type="text"
              placeholder="Account Name"
              name="account-name"
              id="account-name"
              className="my-2"
            />
            <Input
              required
              type="text"
              placeholder="Account Type"
              name="account-type"
              id="account-type"
              className="my-2"
            />
            <Button className="m-2 bg-custsec" type="submit">
              Add New Account
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
