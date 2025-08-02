import UserList from '@/Components/Users/Index';

export default function Users({ users }) {
    return (
        <div>
            <UserList users={users} />
        </div>
    );
}
