import CouponList from "@/Components/Coupon";

export default function CouponPage({ coupons }) {
    return (
        <div className="p-6">
            <CouponList coupons={coupons} />
        </div>
    );
}
