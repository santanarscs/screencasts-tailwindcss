import { PopularDestinations } from "../components/PopularDestination";

export default function Home() {
  return (
    <>
      <div className="bg-gray-100 grid lg:grid-cols-2 2xl:grid-cols-5">
        <div className="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full xl:mr-0 2xl:col-span-2">
          <div className="xl:max-w-xl">
            <img className="h-10" src="/images/logo-brand.svg" alt="Workcation"/>
            <img 
              className="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover object-center lg:hidden"
              src="/images/beach-work.jpg" 
              alt="Woman workcationing on the beach"
            />
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
              You can work from anywhere. 
              <br className="inline"/>
              <span className="text-brand">
                Take advantage of it.
              </span>
            </h1>
            <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl">
              Workcation helps you find work-friendly rentals in beautiful location
              so you can enjoy some nice weather even when you're not on vacation.
            </p>
            <div className=" mt-4 space-x-1 sm:mt-6">
              <a className="btn btn-primary shadow-lg hover:-translate-y-0.5 transform transition" href="#">Book your escape</a>
              <a className="btn btn-secondary" href="#">Learn more</a>
            </div>
          </div>
        </div>
        <div className="hidden relative lg:block 2xl:col-span-3">
          <img 
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="/images/beach-work.jpg" 
            alt="Woman workcationing on the beach"
          />
        </div>
      </div>
      <PopularDestinations />
    </>
  )
}
