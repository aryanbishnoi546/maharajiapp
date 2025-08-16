import { usePage } from '@inertiajs/react';
import EditCoupon from '@/Components/Coupon/edit';

export default function Edit_Coupon() {
  const { coupon } = usePage().props;  
  return <EditCoupon coupon={coupon} />; 
}
