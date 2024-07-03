import Button from '@/components/Global/Button';
import Link from 'next/link';
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <section className='p-6 sm:px-8 xl:px-16 2xl:px-32 pt-16 pb-16 bg-white mx-auto max-w-7xl'>
      <p className='text-primary-2 font-semibold text-lg'>Privacy Policy</p>

      {/* Privacy Policy */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        {/* <p className='mb-2'>Privacy Policy</p> */}
        <p>
          UrbanOverstock`s mission is to put people at the heart of commerce,
          empowering everyone to thrive. Our community is based on trust and
          respect, and we think it`s something special, so we`ve established our
          Community Guidelines (“Guidelines”) as part of our{' '}
          <Link href='/terms-and-conditions' className='underline'>
            Terms of Use
          </Link>{' '}
          to ensure UrbanOverstock can be a safe and trustworthy place to buy
          and sell together. Whether you come to UrbanOverstock to browse, buy,
          or sell, our Community Guidelines apply to all Overstockers and all of
          the ways we connect, including Listings, Comments, Conversations,
          Images, Videos, We also have policies specifically for{' '}
          <a href='' className='underline'>
            buyers
          </a>{' '}
          and{' '}
          <a href='' className='underline'>
            Sellers.
          </a>
          <br />
          By using UrbanOverstock, you are subject to this policy across the
          UrbanOverstock marketplace and services, including all community
          spaces. Violations of these Guidelines may result in deleted content,
          removal of listings or restrictions to your account. We may also
          report certain harmful content or conduct to the appropriate law
          enforcement authorities. As in any diverse community, you may
          encounter content on UrbanOverstock that you don`t like or agree with,
          even though that content doesn`t violate our Guidelines. If you
          encounter someone you`d rather not engage with, you can unfollow or{' '}
          <a href='' className='underline'>
            block a user.
          </a>
          <br />
          If you see something or someone on UrbanOverstock that doesn`t follow
          these guidelines, please{' '}
          <a href='' className='underline'>
            report it to us
          </a>{' '}
          and do not engage with Overstockers who behave inappropriately. Our
          team will investigate and take the appropriate action. If you have an
          issue with one of your orders, or with another Posher, please{' '}
          <a href='' className='underline'>
            contact us
          </a>{' '}
          for support.
        </p>
      </div>
      {/* Be Respectful */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>Be Respectful</p>
        <p>
          In order to maintain a safe and welcoming community, we expect
          Overstockers to be respectful in their interactions with others. We
          ask everyone to be kind, assume best intentions, and consider how your
          content, conduct, or behavior may be received by an audience with
          mixed sensibilities. We understand not everyone always sees
          eye-to-eye, but we do not tolerate harassment or other forms of
          bullying. Please review the Anti-Bullying Policy below for more
          information on what types of behavior we do not allow.
          <br />
          <br />
          Inclusivity is central to our community, so we do not allow behavior
          or content that is sexually explicit, hateful, or excessively violent.
          For more information on how we define these content categories, please
          see the
          <Link href="/restricted-policy" className='underline'>
            {' '}
            Prohibited Items Policy.
            </Link>
        </p>
      </div>
      {/* Be Safe */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>Be Safe</p>
        <p>
          Do not post private communications, contact information such as your
          email address and phone number, or other personal details in any
          public spaces on UrbanOverstock. Do not make threats or attempts to
          give out the personal information of others.
          <br />
          Do not engage in or glorify unsafe activities, which includes any
          acts, behavior, or misinformation that may endanger or physically harm
          yourself or others.
        </p>
      </div>
      {/* Be Real */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>Be Real</p>
        <p>
          It takes real people to build a thriving community. Please don`t
          engage in any behavior to impersonate or mislead others. This
          includes, but is not limited to implying a false affiliation with
          other individuals, groups, or brands. You may not use UrbanOverstock
          to collect personal data or content that doesn`t belong to you or to
          which you do not own the rights. Be respectful of the intellectual
          property rights of others.
          <br />
          While Overstockers are welcome to recruit human helpers, we don`t
          allow Overstockers to use unauthorized programs or other forms of
          automation to participate on UrbanOverstock. This includes, but is not
          limited to, deleting and reposting content, liking, sharing,
          following, and unfollowing.
        </p>
      </div>
      {/* Don’t Spam or Solicit  */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>Don`t Spam or Solicit</p>
        <p>
          Spam comes in many forms, but typically refers to posting unsolicited
          or unwanted promotional content over and over. This may also include
          excessively reposting the same item for sale. Spam can be a nuisance
          for other Overstockers, so please don`t do it.
          <br />
          UrbanOverstock is also not the place to post any content that
          constitutes a contest, raffle, or sweepstakes. Do not ask for or
          otherwise solicit donations of money, goods, or services through our
          platform or by advertising a third party site. However, Overstockers
          are welcome to sell their clothing, accessories, and select home goods
          for any lawful cause to which they choose to donate proceeds on their
          own. UrbanOverstock does not verify donation receipt.
        </p>
      </div>
      {/* Keep Transactions on UrbanOverstock   */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>Keep Transactions on UrbanOverstock</p>
        <p>
          You may not use UrbanOverstock to conduct transactions off the
          platform or offline. Sales that originate on UrbanOverstock must be
          completed through UrbanOverstock, including any discussion about
          details of the item or price negotiation. For more information, please
          see our Off-Site Transactions Policy below.
          <br />
          In the event of a dispute, ourOverstock program does not cover buyers
          or sellers if any part of the transaction was taken off of
          UrbanOverstock. This also applies to trades and unauthorized giveaways
          as they are honor-based agreements which we cannot guarantee will be
          fulfilled as described.
        </p>
      </div>
      {/* Anti-Bullying Policy   */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>Anti-Bullying Policy</p>
        <p>
          Bullying is not allowed on UrbanOverstock. Bullying can mean different
          things to different people, but we define it as repeated unwelcome
          socially aggressive behavior from an individual or a group targeted
          towards another individual or group. UrbanOverstock reserves the right
          to evaluate bullying behavior in its sole discretion. Bullying
          includes but is not limited to the behaviors outlined below.
        </p>

        <ul className='mt-2 list-disc pl-4 md:pl-8 leading-7'>
          <li>Harassment:</li>
          <li>
            Sending cruel or harmful messages or using other methods of contact
            (including tagging) to engage with a specific target without a clear
            and reasonable purpose
          </li>
          <li>
            Circumventing the block feature or continuing to engage with someone
            after they have requested not to be contacted.
          </li>
          <li>
            Using derogatory language, violent threats, or encouraging self-harm
            even if intended as a joke
          </li>
          <li>
            Doxing: Sharing someone else`s non-public personally identifiable
            information
          </li>
          <li>
            Denigration: Publicly shaming or otherwise focusing conversation on
            negative information to demean another user, regardless of truth, in
            order to damage their reputation or discourage buyers from
            purchasing from their closet
          </li>
          <li>
            Brigading: Organizing or participating in a coordinated unwelcome
            action against a target including but not limited to abuse of the
            UrbanOverstock reporting feature
          </li>
        </ul>
        <br />

        <p>
          If you are being bullied on UrbanOverstock, do not engage with the
          aggressor(s). Write to us and let us know, with as much detail as you
          can share, what happened. We`re here to help, but in some cases,
          UrbanOverstock is not in a position to resolve matters of bullying.
        </p>

        <ul className='mt-2 list-disc pl-4 md:pl-8 leading-7'>
          <li>
            If you are concerned about bullying happening outside of
            UrbanOverstock, please seek assistance from the appropriate party
            relative to where you may be experiencing these issues.
          </li>
          <li>
            If you are concerned about defamation or another civil issue, you
            may wish to seek legal advice. UrbanOverstock cannot serve as the
            arbiter of truth.
          </li>
          <li>
            If you are concerned about your safety, consult your local law
            enforcement authorities.
          </li>
        </ul>
        <p className='my-3'>
          UrbanOverstock does not take title to returned items until the item
          arrives at our fulfillment center. At our discretion, a refund may be
          issued without requiring a return. In this situation, UrbanOverstock
          does not take title to the refunded item.
        </p>
        <p className='my-3'>
          All content included in or made available through any UrbanOverstock
          Service, such as text, graphics, logos, button icons, images, audio
          clips, digital downloads, data compilations, and software is the
          property of UrbanOverstock or its content suppliers and protected by
          United States and international copyright laws. The compilation of all
          content included in or made available through any UrbanOverstock
          Service is the exclusive property of UrbanOverstock and protected by
          U.S. and international copyright laws.
        </p>
        <p className='my-3'>
          When you use UrbanOverstock Services, or send e-mails, text messages,
          and other communications from your desktop or mobile device to us, you
          may be communicating with us electronically. You consent to receive
          communications from us electronically, such as e-mails, texts, mobile
          push notices, or notices and messages on this site or through the
          other UrbanOverstock Services, such as our Message Center, and you can
          retain copies of these communications for your records. You agree that
          all agreements, notices, disclosures, and other communications that we
          provide to you electronically satisfy any legal requirement that such
          communications be in writing.
        </p>
        <p className='my-3'>
          You may need your own UrbanOverstock account to use certain
          UrbanOverstock Services, and you may be required to be logged in to
          the account and have a valid payment method associated with it. If
          there is a problem charging your selected payment method, we may
          charge any other valid payment method associated with your account.
          Visit Your Payments to manage your payment options. You are
          responsible for maintaining the confidentiality of your account and
          password and for restricting access to your account, and you agree to
          accept responsibility for all activities that occur under your account
          or password. <br />
          UrbanOverstock does sell products for children, but it sells them to
          adults, who can purchase with a credit card or other permitted payment
          method. If you are under 18, you may use the UrbanOverstock Services
          only with the involvement of a parent or guardian. Parents and
          guardians may create profiles for teenagers in their UrbanOverstock
          Household. <br /> By hitting accept, you relinquish the right to
          taking legal action against UrbanOverstock for any reason.
          UrbanOverstock will always work with you and try our best to resolve
          legal matters but UrbanOverstock is not at fault for any accidents as
          a result of a purchase or transaction.
        </p>
      </div>

      {/*  */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>When do I get paid for a shipped order?</p>
        <p>
          After the buyer receives the item, we release the money to your Urban
          Overstock account within 3 days of delivery (barring any raised
          claims).
        </p>
      </div>
      {/*  */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>How to cancel an accidental purchase</p>
        <p>
          Shipped orders cannot be canceled. Accidental orders must be canceled
          within the hour they were purchased. You may try to get a refund from
          the seller but you are at their discretion.
        </p>
      </div>
      {/*  */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>What are the fees for selling on UrbanOverstock?</p>
        <p>
          Our fees are very simple and straightforward. For all sales under $15,
          UrbanOverstock takes a flat commission of $2.95. You keep the rest.
          For sales of $15 or more, you keep 80% of your
        </p>
      </div>
      {/*  */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>
          What should I do if someone asks me to take a transaction offline?
        </p>
        <p>
          Purchasing or selling an item listed on UrbanOverstock using any means
          other than UrbanOverstock checkout is considered an offline
          transaction and is prohibited. The buyer/seller is 100% liable for any
          transaction that occurs outside the platform.
        </p>
      </div>
      {/*  */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>What should I do when I receive my order?</p>
        <p>
          Once your order is delivered, carefully look it over to ensure no
          issues. You have 24 hours to file a claim. After that, sale is final.
        </p>
      </div>
      {/*  */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>What will help my listing sell faster?</p>
        <p>
          Sell your items quickly by following these helpful tips:
          <br />
          Use professional taken pictures with great lighting when taking
          pictures! Buyers want to clearly see the item and how it looks on
          someone else. Rather than posting just the item, post items that are
          being worn by a model.
        </p>
      </div>
      {/*  */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>Products Page</p>
        <p>New additions to Urban Overstock</p>
      </div>
      {/*  */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>* Contact Now</p>
        <p>
          For all inquiries please reach out to support@urbanoverstock.con and
          we will get back to you as soon as possible!
        </p>
      </div>
      {/*  */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>* About Us</p>
        <p>
          Urban Overstock is virtual marketplace for all the newest and hottest
          social media based clothing brands. There are so many incredible
          creators that don`t get the credit or revenue they desire because
          they`re competing with bigger and more established brands, or people
          simply don`t know about them. What we do is give them a different
          platform to grow, expand, and reach different target audiences.
        </p>
      </div>
      {/*  */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2'>* Home Decor</p>
        <p>
          Revitalize any living space with distinctive pieces you won`t find
          anywhere else!
          <br />* Our Community
          <br /> * Landing page
          <br /> * Privacy policy
        </p>
      </div>

      {/* Buttons */}
      <div className='mt-16 flex items-center gap-4 justify-end'>
        <Link href='/'>
          <Button variant='outlined' color='dark'>
            Cancel
          </Button>
        </Link>
        {/* <Button>Agree</Button> */}
      </div>
    </section>
  );
}
