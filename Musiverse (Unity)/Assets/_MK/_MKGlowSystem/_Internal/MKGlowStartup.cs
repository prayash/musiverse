//Add this to a gameobject in scene to enable SceneView Glow settings on Unity startup 
//otherwise you have to open once the sceneview glow settings (MK Glow System -> Scene Glow Settings)

#if UNITY_EDITOR
using UnityEngine;

[ExecuteInEditMode]
public class MKGlowStartup : MonoBehaviour 
{
	private void Main () 
	{
		MKGlowSystemSV.MKGlowSystemSceneView.Load ();
	}
}
#endif
