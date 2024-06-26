This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# DEVELOPMENT PROCESS OF PIXLAB

Welcome to the frontend demonstration of how the PixLab NSFW API works when it is being interacted with client's side apps using Nextjs

## DEVELOPING THE APP ROUTER

The app router houses the client side, and also the server side folder. In the server side, we created a route /api/nswft/route.jsx. This file carries out a post request to the GOLANG API in order to prevent CORS error

### Testing the image using PIXLAB API.

```http
  POST /api/nsfw
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `img`     | `string` | **Required**.User's inputed image   |
| `key`     | `string` | **Required**. Key form PIXLAB's api |

**Response:**

- Status: 200 OK
- Body:
  ```json
  {
    "data": {
      "status": "pixLab_status",
      "score": "pixlab_score"
    }
  }
  ```

### Example Request

```http
POST /api/nsfw
Content-Type: application/json

{
  "img": "user's_image",
  "key": "pxi_lab_key",
}

```

## DEVELOPING THE CLIENT SIDE SECTION

### Initializing States

**States:**

```json
const [image, setImage] = useState("");
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);
```

### Uploading images use of next-cloudinary

```
**next-cloudinary:**
<CldUploadWidget
multiple
onSuccess={handleUpload}
uploadPreset="dl93zl9fn"
folder="uploads"
sources={["local", "url", "camera"]} >
{({ open }) => {
return (
<div
className="w-full cursor-pointer border-dotted px-4 md:px-8 border-4 border-[rgba(0,0,0,.2)] h-[250px] flex flex-col gap-4 items-center justify-center
"
onClick={() => open()} >
<CiImageOn fontSize={"38px"} />
<span className="text-sm text-center">
Upload a fileNo file chosen or drag and drop PNG, JPG,
GIF up to 10MB
</span>
</div>
);
}}
</CldUploadWidget>

```

### Interacting with Nextjs server

**Logic:**

```json
  const tempKey = "74389de25cb37a10adf615e8a79c8da4";
  const handleTextImage = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/nswft", {
        img: image,
        key: tempKey,
      });
      setResult(data);
      toast.success("Image test successfull!!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

```

### Setting up the Logic

We make use of tenary operators in checking for conditions in rendering of the images.

So in the first line we are saying that if the state (image) is empty and also the result form the server is not defined we should render the div. This div is also conditioned to check if the score response from the server is 1. If it is 1, then we should display the image without blurring it else we should just blur the image. Else in all of this, we should just return th image when it has not yet being sent to the server

```json
    {image !== "" && result ? (
            <div className="w-full">
              {result?.score === 1 ? (
                <Image
                  alt="Cotion"
                  width={0}
                  sizes="100vw"
                  height={0}
                  loading="lazy"
                  src={image}
                  // blurDataURL={image | ""}
                  className="h-[250px] w-full md:mx-auto object-cover"
                />
              ) : (
                <Image
                  alt="Cotion"
                  width={0}
                  sizes="100vw"
                  height={0}
                  loading="lazy"
                  style={{ filter: "blur(10px" }}
                  src={image}
                  className="h-[250px] w-full md:mx-auto object-cover"
                />
              )}
            </div>
          ) : (
            <>
              {image ? (
                <Image
                  alt="Cotion"
                  width={0}
                  sizes="100vw"
                  height={0}
                  loading="lazy"
                  src={image}
                  // blurDataURL={image | ""}
                  className="h-[250px] w-full md:mx-auto object-cover"
                />
              ) : (
                <CldUploadWidget
                  multiple
                  onSuccess={handleUpload}
                  uploadPreset="dl93zl9fn"
                  folder="uploads"
                  sources={["local", "url", "camera"]}
                >
                  {({ open }) => {
                    return (
                      <div
                        className="w-full cursor-pointer border-dotted px-4  md:px-8 border-4 border-[rgba(0,0,0,.2)] h-[250px] flex flex-col gap-4 items-center justify-center
          "
                        onClick={() => open()}
                      >
                        <CiImageOn fontSize={"38px"} />
                        <span className="text-sm text-center">
                          Upload a fileNo file chosen or drag and drop PNG, JPG,
                          GIF up to 10MB
                        </span>
                      </div>
                    );
                  }}
                </CldUploadWidget>
              )}
            </>
          )}
```
