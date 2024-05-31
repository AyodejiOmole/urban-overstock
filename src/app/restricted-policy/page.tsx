import Button from '@/components/Global/Button';
import Link from 'next/link';
import React from 'react';

export default function ProtectedPolicy() {
  return (
    <section className='p-6 sm:px-8 xl:px-16 2xl:px-32 pt-16 pb-16 bg-white mx-auto max-w-7xl'>
      <p className='text-primary-2 font-semibold text-lg'>Restricted Products Policy</p>

      {/* Privacy Policy */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        {/* <p className='mb-2'>Privacy Policy</p> */}
        <p>
        UrbanOverstock’s Restricted Products policy is designed to protect customers, sellers, and the integrity of the marketplace. By enforcing this policy, UrbanOverstock aims to prevent the sale of unsafe, illegal, or harmful products. The policy is subject to frequent updates to reflect changes in regulations, industry standards, and customer expectations. Therefore, it is crucial for sellers to stay updated with the latest revisions to remain in compliance.
        <br/>
        To ensure adherence, sellers must conduct due diligence before listing any products on UrbanOverstock. This involves understanding relevant laws, regulations, and policies governing the sale of specific items, obtaining necessary permits or licenses, and providing accurate product information.
        <br/>
        Failure to comply with the policy can lead to severe consequences, such as account suspension or closure. UrbanOverstock employs a zero-tolerance approach toward policy violations, emphasizing the significance of strict compliance. By shopping on UrbanOverstock, user(s) acknowledge that UrbanOverstock holds final verdict on what is and what isn’t prohibited.
        </p>
      </div>

      <h3 className="my-4 font-semibold">Different Categories of UrbanOverstock Restricted Product List</h3>
      {/* Hazardous material */}
      <div className='text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2 text-md text-black font-semibold'>Hazardous Materials </p>
        <p>
        This category includes items that pose potential risks to health, safety, or the environment. It encompasses flammable, corrosive, explosive, or toxic substances. 
        Examples of restricted hazardous materials include certain types of batteries, aerosol sprays, and chemicals.
        </p>
      </div>
      {/* Intellectual Property Infringement */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2 text-md text-black font-semibold'>Intellectual Property Infringement</p>
        <p>
        UrbanOverstock places significant importance on protecting intellectual property rights. Therefore, products that violate copyrights, trademarks, patents, or any other intellectual property are strictly prohibited. 
        Sellers must ensure that the products they list do not infringe on any third-party rights.
        </p>
      </div>
      {/* Weapons and Ammunition */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2 text-md text-black font-semibold'>Weapons and Ammunition</p>
        <p>
        The sale of firearms, ammunition, explosives, and certain accessories is heavily regulated on UrbanOverstock. 
        Sellers must comply with federal, state, and local laws when dealing with these products.
        </p>
      </div>
      {/* Medical and Healthcare Products  */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2 font-semibold text-md text-black'>Medical and Healthcare Products</p>
        <p>
            Certain medical devices, medications, and healthcare products require specific permissions or certifications to be sold on UrbanOverstock. 
            Sellers must verify the necessary qualifications and approvals before listing such items.
        </p>
      </div>
      {/* Age-Restricted Products */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2 font-semibold text-black text-md'>Age-Restricted Products</p>
        <p>
            Products intended for adult use, such as alcohol, tobacco, and adult content, have strict age restrictions. 
            Sellers must verify the age of customers for these products and adhere to relevant laws.
        </p>
      </div>
      {/* Currency and Stamps    */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2 text-black font-semibold text-md'>Currency and Stamps </p>
        <p>
            The sale of counterfeit currency, coins, or stamps is prohibited on UrbanOverstock. 
            Genuine collectible currency and stamps may be sold but with strict adherence to guidelines.
        </p>
      </div>
      {/* Recalled products */}
      <div className='mt-8 text-gray-700 font-light text-sm leading-6'>
        <p className='mb-2 text-black font-semibold text-md'> Recalled products </p>
        <p>
            Listing recalled items is strictly prohibited, as they pose potential risks to consumers. 
            Sellers must ensure they are not offering recalled products for sale.
        </p>

        <ul className='mt-2 list-disc pl-4 md:pl-8 leading-7'>
            <li>Aerosol paint.</li>
            <li>Airsoft/BB guns, paintball guns.</li>
            <li>Alcohol recovery or hangover cures or treatments.</li>
            <li>Alcohol: products intended to disguise or conceal alcohol.</li>
            <li>Anti-radiation products (including electromagnetic field protection and radiation neutralizing or shielding products).</li>
            <li>Bows and arrows, slingshots, and other projectile weapons.</li>
            <li>Chewing gum (Singapore only).</li>
            <li>Coupon sites.</li>
            <li>Cryptocurrencies.</li>
            <li>Escort services, adult dating, sex toys and merchandise.</li>
            <li>Etching creams.</li>
            <li>Fat burners, fat freezers, and fat blockers.</li>
            <li>Fertility clinics and research.</li>
            <li>Free non-Kindle ebooks (except on Seller Central).</li>
            <li>Get-rich-quick and pyramid schemes.</li>
            <li>Handgun safety certificates.</li>
            <li>Illicit and recreational drugs, drug paraphernalia, drug testing equipment, or products to beat drug tests.</li>
            <li>Illegal or sensitive pharmaceutical or medical device products and services.</li>
            <li>Imitation tobacco products, e.g. toys that resemble cigarettes, or fake tobacco packaging (Singapore only).</li>
            <li>Oils, supplements, or ingestibles that are derived from or contain hemp, cannabidiol (CBD), THC, or otherwise related to cannabis.</li>
            <li>Medical procedures and research.</li>
            <li>Tobacco or tobacco-related products, including e-cigarettes.</li>
            <li>Knives (except for kitchen knives, cutlery, and general multi-purpose camping knives).</li>
            <li>NL: Knives and other bladed objects are prohibited except for kitchen knives, cutlery or silverware.</li>
            <li>Lethal and non-lethal weapon sales, including guns, gun parts, kits, gun racks, mace, black powder, and ammunition.</li>
            <li>Loyalty/affinity/rewards and related content.</li>
            <li>Malware, scareware, or spyware.</li>
            <li>Online pharmacies.</li>
            <li>Pre-natal gender selection and determination test products and services.</li>
            <li>Premium pay-per-call services, such as 900 numbers in the US.</li>
            <li>Products, services, technology, or website content that i) infringes, encourages or enables the infringement of the intellectual property or personal rights of others, or ii) promotes any illegal or dangerous activity, including false document services, counterfeit designer goods, cable descramblers, fireworks, or websites that promote hacking or evading law enforcement.</li>
            <li>Psychics and related content.</li>
            <li>Religious or spiritual services.</li>
            <li>CH, DE, DK, FI, FR, NL, NO, PL, and SE: Content that promotes Scientology or Dianetics (e.g. books published by L Ron Hubbard).</li>
            <li>Shock collars (including pet training collars with any type of shock function) and pinch or choke collars.</li>
            <li>Short-term high-interest loans with a repayment period under 12 months and an APR of more than 50% (or 25% in Denmark).</li>
            <li>“Stripper” or dancing poles</li>
            <li>Any spy cam and/or voice bug disguised as an everyday item that is capable of transmitting video/audio via WIFI/GRMS/IP/GSM/Bluetooth to someone else, without the person knowing they are being recorded (Germany only).</li>
            <li>Tattooing and body branding products and services.</li>
            <li>Testosterone boosters.</li>
            <li>Ticket resellers (Australia and New Zealand only).</li>
            <li>UV tanning services and equipment.</li>
            <li>Weapons.</li>
        </ul>
        <br />
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
