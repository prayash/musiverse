using UnityEngine;
using System.Collections;

public class Visualizer : MonoBehaviour {
	
	public int numCubes = 100;
	public int numSpheres = 100;
	public GameObject[] cubes;
	public GameObject[] spheres;
	public GameObject camera;
	public GameObject[] planets;
	
	public Texture2D splatter;
	public Material glowMaterial;
	
	
	// Use this for initialization
	void Start () {
		camera = GameObject.Find("MainCamera");
		
		// Cubes
		cubes = new GameObject[numCubes];
		for(int i = 0; i < numCubes; i++) {
			cubes[i] = GameObject.CreatePrimitive(PrimitiveType.Cube);
			cubes[i].transform.position = new Vector3(Random.Range (-100f, 100f), Random.Range (-100f, 100f), Random.Range (-100f, 100f));
			//      cubes[i].transform.position = new Vector3(0, 0, 0);
			
			Material material = new Material(Shader.Find ("Specular"));
			if (i % 6 == 0) {
				material.color = new Color(Random.Range (0.0f, 1.0f), Random.Range (0.0f, 1.0f), Random.Range (0.0f, 1.0f));
				cubes[i].GetComponent<Renderer>().material = material;
			} else {
				//        cubes[i].GetComponent<Renderer>().material.mainTexture = splatter;    
				cubes[i].GetComponent<Renderer>().material = material;
			}
			
			//      cubes[i].GetComponent<Renderer>().material = glowMaterial;
			
		}
		
		// Spheres
		spheres = new GameObject[numSpheres];
		for (int i = 0; i < numSpheres; i++) {
			spheres[i] = GameObject.CreatePrimitive(PrimitiveType.Sphere);
			spheres[i].transform.position = new Vector3(Random.Range (-100f, 100f), Random.Range (-100f, 100f), Random.Range (-40f, 40f));
//			spheres[i].transform.position = new Vector3(0, 0, 0);
			
			Material material = new Material(Shader.Find ("Transparent/Diffuse"));
			spheres[i].GetComponent<Renderer>().material = glowMaterial;
			material.color = new Color(Random.Range (0.0f, 1.0f), Random.Range (0.0f, 1.0f), Random.Range (0.0f, 1.0f));
			spheres[i].GetComponent<Renderer>().material = material;
		}
		
	}
	
	// Update is called once per frame
	void Update () {
		// Spectrum Data
		float [] spectrum = AudioListener.GetSpectrumData(1024, 0, FFTWindow.BlackmanHarris);
		float lowFreqs = spectrum[5] + spectrum[50] + spectrum[100] + spectrum[150];
		float highFreqs = spectrum[200] + spectrum[250] + spectrum[300] + spectrum[350] + spectrum[400] + spectrum[450] + spectrum[500] + spectrum[650] + spectrum[750] + spectrum[850] + spectrum[950];
		Debug.Log("LOW: " + lowFreqs + " HIGHS: " + highFreqs);

		planets = GameObject.FindGameObjectsWithTag("planet");
		for (int i = 0; i < planets.Length; i++) {
			planets[i].transform.Rotate (new Vector3 (30, 90, 45) * Time.deltaTime * 0.25f);
		}
		
		// Cubes Processing
		for (int i = 0; i < numCubes; i++) {
			cubes[i].transform.Rotate (new Vector3 (15, 30, 45) * Time.deltaTime * 0.5f);
			
			Vector3 previousScale = cubes[i].transform.localScale;
	        if (i % 2 == 0) {
				previousScale.x = Mathf.Lerp(previousScale.x, highFreqs * 400, Time.deltaTime * 30);
				previousScale.y = Mathf.Lerp(previousScale.y, highFreqs * 400, Time.deltaTime * 30);
				cubes[i].transform.localScale = previousScale;
		    } else {
				previousScale.y = Mathf.Lerp(previousScale.y, highFreqs * 400, Time.deltaTime * 30);
				cubes[i].transform.localScale = previousScale;
			}
//			cubes[i].transform.position += Vector3.back * Time.deltaTime * i * 0.005f;
			
			
			
			// Distort Mesh
			if (i % 7 == 0) {
		      Mesh mesh = cubes[i].GetComponent<MeshFilter>().mesh;
		      Vector3[] vertices = mesh.vertices;
		      int p = 0;
		      while (p < vertices.Length) {
					vertices[p] += new Vector3(Random.Range(-0.1F, 0.1F), Random.Range(-0.1F, 0.1F), Random.Range(-0.1F, 0.1F));
		        	p++;
		      }
		      mesh.vertices = vertices;
		      mesh.RecalculateNormals();
			}
		}
		
		// Spheres Processing
		for (int i = 0; i < numSpheres; i++) {
			Vector3 previousScale = spheres[i].transform.localScale;
			previousScale.x = Mathf.Lerp(previousScale.x, lowFreqs * 60, Time.deltaTime * 30);
			previousScale.y = Mathf.Lerp(previousScale.y, lowFreqs * 60, Time.deltaTime * 30);
			previousScale.z = Mathf.Lerp(previousScale.z, lowFreqs * 60, Time.deltaTime * 30);
			spheres[i].transform.localScale = previousScale;
		}
	}
}
