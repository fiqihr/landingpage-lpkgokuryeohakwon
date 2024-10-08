const TentangKami = () => {
  return (
    <section id="tentangkami" className="pt-10">
      <h1 className="text-4xl lg:text-5xl font-bold text-center mt-10 mb-5 lg:mt-20 lg:mb-20 text-primary">
        <span className="border-b-4 border-gray-200">Tentang Kami</span>
      </h1>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-tl from-white via-gray-50 to-gray-100 shadow-md rounded-lg">
          <div className="w-full md:w-2/3 lg:w-1/3 flex justify-center p-8">
            <img
              src="/images/logo.png"
              alt="home"
              className="w-2/3 lg:w-4/5"
            />
          </div>
          <div className="w-full lg:w-2/3 lg:pr-8 self-center text-center lg:text-left  p-8">
            <h4 className="text-3xl font-bold mb-5 ">LPK Gokuryeo Hakwon</h4>
            <p className="text-left lg:text-left text-gray-800">
              LPK Gokuryeo adalah lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quae nihil praesentium molestias, vel ducimus
              enim debitis optio molestiae voluptates? Expedita autem atque ut,
              animi accusamus corporis, et beatae tempore dicta voluptatum
              magnam sunt Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Quae nihil praesentium molestias, vel ducimus enim debitis
              optio molestiae voluptates? Expedita autem atque ut, animi
              accusamus corporis, et beatae tempore dicta voluptatum magnam sunt
              quibusdam. Praesentium enim explicabo impedit doloribus obcaecati.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TentangKami;
