import Button from '@/components/Global/Button';
import Link from 'next/link';
import React from 'react';

export default function TermsOfUse() {
  return (
    <section className='p-6 sm:px-8 xl:px-16 2xl:px-32 pt-16 pb-16 bg-white'>
      <p className='text-primary-2 font-semibold text-lg'>Terms of Use</p>

      {/* Terms of Use */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        {/* <p className='mb-2'>Terms of Use</p> */}
        <p>
          Welcome to UrbanOverstock.com. UrbanOverstock.com Services LLC and/or
          its affiliates (`UrbanOverstock`) provide website features and other
          products and services to you when you visit or shop at
          UrbanOverstock.com, use UrbanOverstock products or services, use
          UrbanOverstock applications for mobile, or use software provided by
          UrbanOverstock in connection with any of the foregoing (collectively,
          `UrbanOverstock Services`). By using the UrbanOverstock Services, you
          agree, on behalf of yourself and all members of your household and
          others who use any Service under your account, to the following
          conditions.
        </p>
      </div>

      {/* How is sales tax calculated? */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>How is sales tax calculated?</p>
        <p>
          State and local sales tax, when applicable, will be charged on items
          purchased on UrbanOverstock that are shipped to a U.S. address. The
          amount of sales tax charged on an order is based on a number of
          factors including, but not limited to:
        </p>

        <div className='mt-8'>
          <p>Type of item purchase</p>
          <p>Buyer`s delivery address</p>
          <p>Seller`s return address</p>
          <p>Shipping costs</p>
        </div>
      </div>

      {/* Shipping */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>Shipping</p>
        <p>
          After purchase is made, the seller has 72 hours to ship. If an item
          isn`t shipped within that time frame, the buyer is entitled to a full
          refund if they request it. We strongly recommend shipping within 48
          hours. 72 hours is the absolute limit to comply.
        </p>
      </div>

      {/* Return policy */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>Return policy</p>
        <p className='mb-4'>
          Since buyers can`t inspect the item until it gets there, they have two
          days to look it over after delivery. If they notice damage, something
          missing, or anything else that doesn`t meet the expectations set by
          the item listing, the buyer can ask the seller for a refund. If the
          seller declines or is unresponsive, the buyer may file a purchase
          protection claim up to 48hrs later (a total of 2 days after receiving
          the item). Once this period expires, the buyer will be unable to
          request a refund or file a claim.
        </p>
        <p className='my-4'>
          A return request can typically take our team 1-2 business days to
          process. Please note that the length of time to review a case can vary
          depending on the proof we have on hand, as well as the response time
          it takes for a buyer or a seller to get back to us.
        </p>
        <p className='my-4'>
          Once a case has been submitted, we will work with both parties to
          facilitate the return. In order to speed up the process, we ask that
          both parties provide clear evidence of their claim. Aside from full
          pictures of the item received, the evidence we typically ask for
          includes, but is not limited to:
        </p>
        <div className='mt-8'>
          <p>
            <b>Damage Claim: </b>Clear, crisp photos of the problem area(s) in
            bright or natural lighting.
          </p>
          <p>
            Color of item is misrepresented: Clear photos in natural lighting
            are the best way to showcase the true color of an item.
          </p>
          <p>
            <b>Authenticity claim: </b>Include photos showing tags/serial
            numbers and details such as hardware and stitching.
          </p>
          <p>
            <b>Broken item: </b>
            Clear images of the item, its damage, and the packaging.
          </p>
          <p>
            Wrong item received: Clear image of the item received as well as
            images of shipping labels and packaging.
          </p>
        </div>
        <p className='my-4'>
          When we have proof that the item was misrepresented, we will send the
          buyer a prepaid return label and have them ship the item back to the
          seller. Once the order is delivered back to the seller, we will begin
          to process the buyer`s refund for the full amount they paid, including
          shipping and taxes that were charged for the purchase.
        </p>

        <div className='leading-6'>
          <p className='my-4'>What is covered:</p>
          <p className='my-4'>
            The following issues are covered with purchase protection when
            bought on Urban Overstock
          </p>

          <div className='mt-6'>
            <p>The buyer did not receive the item</p>
            <p>The item is damaged when the buyer receives it</p>
            <p>The item is incorrect or missing</p>
            <p>The item the buyer receives is not as described</p>
            <p>
              Note: If the item isn`t shipped within 5 days of payment, the
              buyer`s payment is automatically canceled and returned to the
              account they used to buy the item.
            </p>
          </div>
        </div>
        {/*  */}
        <div className='leading-6'>
          <p className='my-4'>What isn`t covered:</p>
          <div className='mt-6'>
            <p>An item doesn`t fit or the buyer doesn`t like it</p>
            <p>An item is prohibited by Urban Overstock</p>
            <p>
              The purchase was made in cash or with an in-person cashless
              payment
            </p>
            <p>
              The purchase was conducted through payment or shipping systems
              outside of Urban Overstock
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}

      <div className='mt-16 flex items-center gap-4 justify-end'>
        <Link href='/'>
          <Button variant='outlined' color='dark'>
            Close
          </Button>
        </Link>
      </div>
    </section>
  );
}
